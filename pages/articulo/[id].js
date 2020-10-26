import ReactMarkdown from "react-markdown";

export default function Post({ title, tags, content }) {
  return (
    <section>
      <h1>{title}</h1>
      <ul>
        {tags &&
          tags.map((tag, key) => {
            return <li key={key}>{tag}</li>;
          })}
      </ul>
      <ReactMarkdown>{content}</ReactMarkdown>
    </section>
  );
}

export async function getStaticPaths() {
  const data = await fetch("https://dev.to/api/articles?tag=javascript&top=1");
  const json = await data.json();

  // const paths = json.map(path => `/articulo/${path.id}`)

  const paths = json.map((path) => {
    return `/articulo/${path.id}`;
  });

  return {
    paths: paths,
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const { id } = params;
  const data = await fetch(`https://dev.to/api/articles/${id}`);
  const json = await data.json();

  return {
    props: {
      title: json.title,
      tags: json.tags,
      content: json.body_markdown
    },
    revalidate: 3600
  };
}
