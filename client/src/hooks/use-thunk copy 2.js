import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';

export function useThunk(thunk) {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const dispatch = useDispatch();

	const runThunk = useCallback(
		async (arg) => {
			try {
				setIsLoading(true);
				const response = await dispatch(thunk(arg));
				setIsLoading(false);
				return [response];
			} catch (err) {
				setIsLoading(false);
				setError(err);
				return [null, err];
			}
		},
		[dispatch, thunk]
	);

	return [runThunk, isLoading, error];
}
