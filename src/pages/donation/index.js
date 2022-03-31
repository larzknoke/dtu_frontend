import React, { useState, useEffect } from "react";
import Donations from "src/containers/DonationList";
import Head from "src/components/Head";
import { getAllDonations } from "src/utils/fetch-donations";

function DonationPage() {
	const [donations, setDonastions] = useState([]);

	const getDonations = async () => {
		await getAllDonations().then((data) => {
			setDonastions(data);
		});
	};

	useEffect(() => {
		getDonations();
	}, []);

	return (
		<>
			<Head title="Donations" />
			<Donations donations={donations} />
		</>
	);
}

// export async function getServerSideProps() {
// 	const res = await fetch("http://localhost:3000/donations.json");
// 	if (!res.ok) {
// 		throw `Server error: [${res.status}] [${res.statusText}] [${res.url}]`;
// 	}
// 	const donations = await res.json();

// 	return {
// 		props: {
// 			donations,
// 		},
// 	};
// }

export default DonationPage;
