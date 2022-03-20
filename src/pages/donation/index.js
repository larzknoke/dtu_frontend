import React from "react";
import Donations from "src/containers/DonationList";
import Head from "src/components/Head";

function DonationPage(props) {
	return (
		<>
			<Head title="Donations" />
			<Donations {...props} />
		</>
	);
}

export async function getServerSideProps() {
	const res = await fetch("http://localhost:3000/donations.json");
	if (!res.ok) {
		throw `Server error: [${resp.status}] [${resp.statusText}] [${resp.url}]`;
	}
	const donations = await res.json();

	return {
		props: {
			donations,
		},
	};
}

export default DonationPage;
