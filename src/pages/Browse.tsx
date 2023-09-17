import ContentRows from "../components/content-rows"
import { ENDPOINT } from "../common/endpoints"

export default function Browse() {

  return (
    <section>
      <section>Banner Image</section>
      <ContentRows  endpoint={ENDPOINT.MOVIES_POPULAR} title="Popular" />
      <ContentRows  endpoint={ENDPOINT.MOVIES_TOP_RATED} title="Top Rated" />
      <ContentRows  endpoint={ENDPOINT.MOVIES_NOW_PLAYING} title="Now Playing" />
    </section>
  )
}
