export const ProjectLink = ({
  content,
  link,
}: {
  link: string;
  content: string;
}) => (
  <a
    target="_blank"
    href={link}
    className="text-primary hover:border-primary w-fit border-b border-transparent px-1 font-semibold duration-200"
  >
    {content}
  </a>
);
