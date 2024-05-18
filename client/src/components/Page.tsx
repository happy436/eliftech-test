import { ComponentPropsWithoutRef, FC } from "react";
import classNames from "classnames";

interface PageProps extends ComponentPropsWithoutRef<"div"> {}

const PageTitle: FC<PageProps> = ({ children, title }) => {
	return (
		<header>
			<h1 className="text-5xl font-bold">{title}</h1>
			{children}
		</header>
	);
};

const PageContent: FC<PageProps> = ({ children, className }) => {
	return (
		<section className={classNames("flex flex-col gap-3", className)}>
			{children}
		</section>
	);
};

interface PageComponent extends FC<PageProps> {
	PageTitle: FC<PageProps>;
	PageContent: FC<PageProps>;
}

const Page: PageComponent = ({ className, children }) => {
	return (
		<main
			className={classNames("relative flex flex-col gap-3 mx-24 mt-5", className)}
		>
			{children}
		</main>
	);
};

Page.PageTitle = PageTitle;
Page.PageContent = PageContent;

export default Page;
