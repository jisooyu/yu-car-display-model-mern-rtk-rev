import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import GoogleLogoutButton from '../components/Auth/GoogleLogoutButton';
import Skeleton from '../components/Skeleton';
import Button from '../components/Button';
import { useThunk } from '../hooks/use-thunk';
import { fetchData } from '../store';
import CarSearchPage from './CarSearchPage';
import SearchBar from '../components/SearchBar';

const Dashboard = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [doFetchData, isLoadingData, loadingDataError] = useThunk(fetchData);
	const { data } = useSelector((state) => {
		return state.car;
	});

	const { user } = useSelector((state) => {
		return state.auth;
	});
	const navigate = useNavigate();
	useEffect(() => {
		// Check Redux store for existing data before triggering a new fetch
		if (!data.length) {
			doFetchData();
		}
	}, [doFetchData, data]);
	const handleSearchChange = (e) => {
		setSearchTerm(e.target.value);
	};
	let content;
	if (isLoadingData) {
		content = (
			<Skeleton
				times={20}
				className='h-10 w-full'
			/>
		);
	} else {
		content = (
			<div className='h-20 w-auto flex flex-row justify-between items-center bg-blue-400'>
				<Button
					onClick={() => navigate(user ? '/form' : '/')}
					className='ml-3 text-yellow-300'
					rounded
					danger
				>
					Create Car Data
				</Button>
				<SearchBar
					searchTerm={searchTerm}
					handleSearchChange={handleSearchChange}
				/>
				<GoogleLogoutButton />
			</div>
		);
	}
	if (loadingDataError) {
		content = <div>Error fetching data:{loadingDataError.message}</div>;
	}
	return (
		<>
			{content}
			<div>
				<CarSearchPage
					data={data}
					searchTerm={searchTerm}
				/>
			</div>
		</>
	);
};

export default Dashboard;
