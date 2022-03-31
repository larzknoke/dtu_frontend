const getAllDonations = async () => {
	const data = await fetch("http://localhost:3000/donations.json").then(
		(response) => response.json()
	);
	return data;
};

export { getAllDonations };
