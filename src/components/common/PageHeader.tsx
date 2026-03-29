import TypingText from "./TypingText";

interface PageHeaderProps {
  title: string;
  description: string;
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <header>
      <h1 className="font-bold text-2xl ">{title}</h1>
      <TypingText text={description} />
    </header>
  );
}
