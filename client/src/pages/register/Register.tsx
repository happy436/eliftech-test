import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
	getEventById,
	loadEventById,
	getEventsLoadingStatus,
} from "../../store/events";
import { useDispatch, useSelector } from "react-redux";
import Page from "../../components/Page";
import TextField from "../../components/common/textField/TextField";
import { Event } from "../board/Board";
import { Button, Card } from "@tremor/react";
import { Bounce, toast } from "react-toastify";
import { registration } from "../../store/participants";

type RegisterProps = {};

type Form = {
	email: string;
	name: string;
	dateOfBirth: number;
	eventId: string;
	hearAboutEvent: string;
};

const Register: React.FC<RegisterProps> = () => {
	const param = useParams();
	const dispatch = useDispatch();
	const navigation = useNavigate();

	const isLoadingStatusEvent = useSelector(getEventsLoadingStatus());
	const data: Event = useSelector(getEventById(param.id));

	const [formData, setFormData] = useState<Form>({ eventID: param.id });

	useEffect(() => {
		dispatch(loadEventById(param.id));
	}, []);

	const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (validateForm(formData)) {
			dispatch(registration(param.id, formData));
			navigation("/");
		}
	};
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const validateForm = (formData: Form) => {
		const errors = [];

		if (!formData.name || formData.name.trim() === "") {
			errors.push({ field: "name", message: "Name is required" });
		}

		if (!formData.email || formData.email.trim() === "") {
			errors.push({ field: "email", message: "Email is required" });
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			errors.push({ field: "email", message: "Email is invalid" });
		}

		if (!formData.dateOfBirth) {
			errors.push({
				field: "dateOfBirth",
				message: "Date of Birth is required",
			});
		}

		if (!formData.hearAboutEvent || formData.hearAboutEvent.trim() === "") {
			errors.push({
				field: "hearAboutEvent",
				message: "Please let us know how you heard about this event",
			});
		}

		if (errors.length > 0) {
			errors.forEach((error) => {
				toast.error(error.message, {
					position: "top-right",
					autoClose: 2000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "dark",
					transition: Bounce,
				});
			});
			return false;
		}

		return true;
	};
	const buttonList = ["Social media", "Friends", "Found myself"];
	return (
		<Page>
			{!isLoadingStatusEvent && (
				<>
					<Page.PageTitle
						title={`${data.title} participants`}
					></Page.PageTitle>
				</>
			)}
			<Page.PageContent>
				<Link to="/">
					<Button>Back</Button>
				</Link>
				<Card
					className="mx-auto max-w-xs"
					decoration="top"
					decorationColor="indigo"
				>
					<form onSubmit={() => {}} className="flex flex-col gap-3">
						<TextField
							name="name"
							label="full name"
							onChange={handleChange}
						/>
						<TextField
							name="email"
							label="email"
							onChange={handleChange}
						/>
						<TextField
							onChange={handleChange}
							name="dateOfBirth"
							label="Date of birth"
							type="date"
						/>
						<label htmlFor="hearAboutEvent">
							Where did you hear about this event?
						</label>
						<ul className="flex gap-2 items-center flex-wrap">
							{buttonList.map((button) => (
								<Button
									key={button}
									variant={
										formData.hearAboutEvent === button
											? "primary"
											: "secondary"
									}
									type="button"
									name={button}
									onClick={() =>
										handleChange({
											target: {
												name: "hearAboutEvent",
												value: button,
											},
										})
									}
								>
									{`${
										button[0].toUpperCase() +
										button.slice(1)
									}`}
								</Button>
							))}
						</ul>

						<button type="submit" onClick={handleSubmit}>
							Submit
						</button>
					</form>
				</Card>
			</Page.PageContent>
		</Page>
	);
};
export default Register;
