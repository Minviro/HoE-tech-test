import { type ChangeEvent, useState } from "react";

export const useTextInput = (initialValue = "") => {
	const [value, setValue] = useState(initialValue);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
	};

	return { value, handleChange };
};
