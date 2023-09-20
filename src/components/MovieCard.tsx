import { createImageUrl } from "../common/utils";

const CARD_WIDTH = 200;

type MovieCardProp = {
  poster_path: string;
  id: number;
  title: string;
};

export default function MovieCard({poster_path, id, title}: MovieCardProp) {
  return (
    <section
      key={id}
      className="aspect-square flex-none overflow-hidden rounded-md"
    >
      <img
        loading="lazy"
        src={createImageUrl(poster_path, CARD_WIDTH)}
        alt={title}
        className="h-full w-full"
      />
    </section>
  );
}
