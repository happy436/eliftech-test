import React, { useEffect, useState } from "react";
import Page from "../../components/Page";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	getEvents,
	loadEventsList,
	getEventsLoadingStatus,
} from "../../store/events";
import { Button, Card, Tab, TabGroup, TabList } from "@tremor/react";
import Pagination from "../../components/Pagination";
import { paginate } from "../../utils/paginate";
import { convertDate } from "../../utils/convertData";

type EventsProps = {};

export interface Event {
	_id: string;
	title: string;
	description: string;
	date: Date;
	organizer: string;
}

// Тип для списка событий
type EventsList = Event[];

const Events: React.FC<EventsProps> = () => {
	const data: EventsList = useSelector(getEvents());
    const isLoadingStatus = useSelector(getEventsLoadingStatus());
	const dispatch = useDispatch();

	// завантаження списку
	const isLoading = () => dispatch(loadEventsList());
	useEffect(() => {
		isLoading();
	}, []);

	const [currentPage, setCurrentPage] = useState(1);
	const [eventsList, setEventsList] = useState([]);
	const [activeSearchType, setActiveSearchType] =
		useState<keyof Event>("title");
	useEffect(() => {
		setEventsList(data);
	}, [data]);
	const searchKeyList = ["title", "date", "organizer"];
	const handleActiveSearchType = (index: number) => {
		const searchType = searchKeyList[index];
		setActiveSearchType(searchType);
	};
	useEffect(() => {
		if (eventsList) {
			const sortData = [...eventsList].sort((a, b) => {
				if (a[activeSearchType] < b[activeSearchType]) {
					return -1;
				}
				if (a[activeSearchType] > b[activeSearchType]) {
					return 1;
				}
				return 0;
			});
			setEventsList(sortData);
		}
	}, [activeSearchType]);

	//pagination
	const pageSize = 6;
	const usersCrop = paginate(eventsList, currentPage, pageSize);
	const count = eventsList.length;
	const handlePageChange = (pageIndex: number) => {
		setCurrentPage(pageIndex);
	};

	
	
	return (
		<Page>
			<Page.PageTitle title={"Events"}></Page.PageTitle>
			<Page.PageContent>
				<TabGroup onIndexChange={handleActiveSearchType}>
					<TabList variant="line" defaultValue="1">
						{searchKeyList.map((key) => (
							<Tab value="1" key={key}>
								{key}
							</Tab>
						))}
					</TabList>
				</TabGroup>
				{!isLoadingStatus && eventsList.length !== 0 ? (
					<>
						<ul className="flex flex-wrap justify-center items-center gap-3">
							{usersCrop.map((event: Event) => (
								<li key={event._id}>
									<Card
										className="mx-auto max-w-xs flex flex-col gap-3"
										decoration="top"
										decorationColor="indigo"
									>
										<h3 className="text-xl font-bold">
											{event.title}
										</h3>
										<p>{event.description}</p>
										<p>{convertDate(event.date)}</p>
										<p>{event.organizer}</p>
										<nav>
											<ul className="flex flex-wrap justify-center items-center gap-3">
												<li>
													<Link
														to={`/${event._id}/register`}
													>
														<Button>
															Register
														</Button>
													</Link>
												</li>
												<li>
													<Link
														to={`/${event._id}/viewers`}
													>
														<Button>Viewer</Button>
													</Link>
												</li>
											</ul>
										</nav>
									</Card>
								</li>
							))}
						</ul>
						<div className="d-flex justify-content-center">
							<Pagination
								itemsCount={count}
								pageSize={pageSize}
								currentPage={currentPage}
								onPageChange={handlePageChange}
							/>
						</div>
					</>
				) : (
					<p>Loading</p>
				)}
			</Page.PageContent>
		</Page>
	);
};
export default Events;
