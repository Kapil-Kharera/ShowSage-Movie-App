import { useEffect, useState } from "react";
import { MovieApiResponse, MovieResultObject, fetchRequest } from "../common/api";

//type
type RowProp = {
    endpoint: string,
    title: string
}

export default function ContentRows({title, endpoint}: RowProp) {
    const [rowData, setRowData] = useState<MovieResultObject[]>([]);

    const fetchRowData = async () => {
        const response = await fetchRequest<MovieApiResponse<MovieResultObject[]>>(endpoint);
        console.log(response);
        setRowData(response.results);
    }

    const createImageUrl = (path: string) => {
        return `${import.meta.env.VITE_BASE_IMAGE_URI}/${path}`;
    }
    
      useEffect(() => {
        fetchRowData();
      }, []);

  return (
    <section>
        <h2 className="mb-4">{title}</h2>
        <section className="flex flex-nowrap overflow-x-auto">
            {
                rowData?.map((row) => {
                    const { id, title, poster_path } = row;
                    return <section key={id} className="w-[200px] h-[200px] flex-none">
                        <img src={createImageUrl(poster_path)} alt={title} className="h-full w-full object-contain" />
                    </section>
                })
            }
        </section>
    </section>
  )
}
