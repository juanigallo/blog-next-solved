import ReactMarkdown from "react-markdown";

export default function Post({ title, tags, content }) {
  return (
    <section>
      <h1>{title}</h1>
      <ul>
        {tags.map((tag, key) => {
          return <li key={key}>{tag}</li>;
        })}
      </ul>
      <ReactMarkdown>{content}</ReactMarkdown>
    </section>
  );
}

export async function getServerSideProps({ params }) {
  const { id } = params;
  const data = await fetch(`https://dev.to/api/articles/${id}`);
  const json = await data.json();

  console.log(json.title, json.tags, json.body_html);
  return {
    props: {
      title: json.title,
      tags: json.tags,
      content: json.body_markdown
    }
  };
}
