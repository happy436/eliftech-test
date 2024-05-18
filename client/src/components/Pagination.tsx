import React from "react";
import _ from "lodash";
import { Button } from "@tremor/react";

type PaginationProps = {
	itemsCount: number;
	pageSize: number;
	onPageChange: () => void;
	currentPage: number;
};

const Pagination: React.FC<PaginationProps> = ({
	itemsCount,
	pageSize,
	onPageChange,
	currentPage,
}) => {
	const pageCount = Math.ceil(itemsCount / pageSize);
	if (pageCount === 1) return null;
	const pages = _.range(1, pageCount + 1);
	return (
		<nav>
			<ul className="flex justify-center gap-3 mb-5">
				{pages.map((page: number) => (
					<li
						className={
							"page-item" +
							(page === currentPage ? " active" : "")
						}
						key={"page_" + page}
					>
						<Button
							className="page-link"
							variant={
								page === currentPage ? "primary" : "secondary"
							}
							onClick={() => onPageChange(page)}
						>
							{page}
						</Button>
					</li>
				))}
			</ul>
		</nav>
	);
};
export default Pagination;
