import { DatePicker, TextInput } from "@tremor/react";

interface TextFieldProps {
	name: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
	label: string;
	type?: "text" | "date";
}

const TextField: React.FC<TextFieldProps> = ({
	name,
	onChange,
	placeholder,
	label,
	type,
}) => {
	const dateConversation = (date: string): number => {
		const newDate = new Date(date);
		return newDate.getTime();
	};
	return (
		<div className="mb-4">
			<label
				className="block text-white text-xl font-bold mb-2"
				htmlFor={name}
			>
				{label[0].toUpperCase() + label.slice(1)}
			</label>
			{type === "date" ? (
				<DatePicker
					onValueChange={(value: string) =>
						onChange({
							target: { name, value: dateConversation(value) },
						})
					}
					name={name}
				/>
			) : (
				<TextInput
					className="w-full"
					id={name}
					name={name}
					type="text"
					placeholder={placeholder || name}
					onChange={onChange}
				/>
			)}
		</div>
	);
};

export default TextField;
