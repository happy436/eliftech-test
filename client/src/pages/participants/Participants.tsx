import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Page from "../../components/Page";
import { useDispatch, useSelector } from "react-redux";
import {
	getParticipants,
	loadParticipantsList,
	getParticipantsLoadingStatus,
} from "../../store/participants";
import {
	getEventById,
	loadEventById,
	getEventsLoadingStatus,
} from "../../store/events";
import { Button, Card, Tab, TabGroup, TabList, TextInput } from "@tremor/react";
import { RiSearchLine } from "@remixicon/react";
import Loader from "../../components/common/Loader";

type ParticipantsProps = {};

const Participants: React.FC<ParticipantsProps> = () => {
	const param = useParams();
	const dispatch = useDispatch();
	const event = useSelector<Event>(getEventById(param.id));
	const isLoadingStatus = useSelector(getParticipantsLoadingStatus());
	const participants = useSelector(getParticipants());
	const isLoadingStatusEvent = useSelector(getEventsLoadingStatus());

	const searchKeyList = ["by name", "by email"];

	const [activeSearchType, setActiveSearchType] = useState("");
	const [inputSearch, setInputSearch] = useState<string>("");
	const [filteredData, setFilteredData] = useState([]);

	useEffect(() => {
		dispatch(loadParticipantsList(param.id));
		dispatch(loadEventById(param.id));
	}, []);

	useEffect(() => {
		setFilteredData(participants);
	}, [participants]);

	useEffect(() => {
		if (inputSearch.trim() === "") {
			setFilteredData(participants);
		} else {
			const filteredParticipants = participants.filter((participant) =>
				participant[activeSearchType]
					.toLowerCase()
					.includes(inputSearch.toLowerCase())
			);
			setFilteredData(filteredParticipants);
		}
	}, [inputSearch]);

	const handleSearchChange = (value: string) => {
		setInputSearch(value);
	};

	const handleActiveSearchType = (index: number) => {
		const searchType = searchKeyList[index].split(" ")[1];
		setActiveSearchType(searchType);
	};

	return (
		<Page>
			<Page.PageContent>
				{!isLoadingStatusEvent && (
					<>
						<Page.PageTitle
							title={`${event.title} participants`}
						></Page.PageTitle>
					</>
				)}
				<Link to="/">
					<Button>Back</Button>
				</Link>
				<div>
					<TextInput
						icon={RiSearchLine}
						placeholder="Search by name..."
						value={inputSearch}
						onValueChange={handleSearchChange}
					/>
				</div>
				<TabGroup onIndexChange={handleActiveSearchType}>
					<TabList variant="line" defaultValue="1">
						{searchKeyList.map((key) => (
							<Tab value="1" key={key}>
								{key}
							</Tab>
						))}
					</TabList>
				</TabGroup>
				{!isLoadingStatus ? (
					<ul className="flex flex-wrap justify-center items-center gap-3">
						{filteredData.map((user) => (
							<li key={user.name}>
								<Card
									className="mx-auto max-w-xs"
									decoration="top"
									decorationColor="indigo"
								>
									<p>{user.name}</p>
									<p>{user.email}</p>
								</Card>
							</li>
						))}
					</ul>
				) : (
					(
                        (isLoadingStatus) ? <Loader/> : <p className="text-3xl self-center">Empty</p>
                    )
				)}
			</Page.PageContent>
		</Page>
	);
};
export default Participants;
