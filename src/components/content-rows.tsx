import ChevronLeft from "@heroicons/react/24/outline/ChevronLeftIcon";
import ChevronRight from "@heroicons/react/24/outline/ChevronRightIcon";
import { useEffect, useRef, useState } from "react";
import {
  MovieApiResponse,
  MovieResultObject,
  fetchRequest,
} from "../common/api";
import PageIndicator from "./PageIndicator";
import MovieCard from "./MovieCard";

//type
type RowProp = {
  endpoint: string;
  title: string;
};

const CARD_WIDTH = 200;

export default function ContentRows({ title, endpoint }: RowProp) {
  const sliderRef = useRef<HTMLSelectElement>(null);
  const containerRef = useRef<HTMLSelectElement>(null);
  const [rowData, setRowData] = useState<MovieResultObject[]>([]);
  const [translateX, setTranslateX] = useState(0);
  const [pagesCount, setPagesCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const disablePrev = currentPage === 0;
  const disableNext = currentPage + 1 === pagesCount;
  const cardsPerPage = useRef(0);

  const fetchRowData = async () => {
    const response =
      await fetchRequest<MovieApiResponse<MovieResultObject[]>>(endpoint);
    setRowData(response.results);
  };

 

  function onNextClick() {
    if (sliderRef.current) {
      const updatedTranslateX = translateX - getTranslateXValue();
      sliderRef.current.style.transform = `translateX(${updatedTranslateX}%)`;
      setTranslateX(updatedTranslateX);
      setCurrentPage(currentPage + 1);
    }
  }

  function onPrevClick() {
    if (sliderRef.current) {
      const updatedTranslateX = translateX + getTranslateXValue();
      sliderRef.current.style.transform = `translateX(${updatedTranslateX}%)`;
      setTranslateX(updatedTranslateX);
      setCurrentPage(currentPage - 1);
    }
  }

  function getTranslateXValue() {
    let translateX = 0;
    if (sliderRef.current) {
      translateX =
        ((cardsPerPage.current * CARD_WIDTH) / sliderRef.current.clientWidth) *
        100;
    }

    return translateX;
  }

  useEffect(() => {
    if (rowData?.length) {
      if (containerRef.current) {
        cardsPerPage.current = Math.floor(
          containerRef.current.clientWidth / CARD_WIDTH,
        );
      }

      setPagesCount(Math.ceil(rowData.length / cardsPerPage.current));
    }
  }, [rowData.length]);

  useEffect(() => {
    fetchRowData();
  }, []);

  return (
    <section className="row-container ml-12 hover:cursor-pointer">
      <h2 className="mb-4">{title}</h2>
      <PageIndicator pagesCount={pagesCount} currentPage={currentPage} classname="mb-4 opacity-0 transition-opacity duration-300 ease-in" />
      <section
        ref={containerRef}
        className="relative flex flex-nowrap overflow-hidden"
      >
        {!disablePrev ? (
          <button
            className="absolute z-[1] h-full w-12 bg-black/25 opacity-0 transition-opacity duration-300 ease-in"
            onClick={onPrevClick}
          >
            <ChevronLeft />
          </button>
        ) : null}
        {!disableNext ? (
          <button
            className="absolute right-0 z-[1] h-full w-12 bg-black/25 opacity-0 transition-opacity duration-300 ease-in"
            onClick={onNextClick}
          >
            <ChevronRight />
          </button>
        ) : null}
        <section
          ref={sliderRef}
          className="flex gap-4 transition-transform duration-700 ease-linear"
        >
          {rowData?.map((row) => {
            return (
              <MovieCard key={row.id} {...row} />
            );
          })}
        </section>
      </section>
    </section>
  );
}
