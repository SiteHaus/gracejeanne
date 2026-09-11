interface BannerProps {
  content: string;
  className: string;
}

export const Banner = ({ content, className }: BannerProps) => {
  return <div className={`w-full ${className}`}> {content}</div>;
};
