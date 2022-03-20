import React from "react";
import { Typography, Divider } from "antd";

const { Title } = Typography;

function Donation(props) {
	const { donation = [] } = props;

	return (
		<>
			<Title level={2} style={{ marginBottom: 0 }}>
				{donation.title}
			</Title>
			<Divider plain style={{ margin: "18px 0px" }}></Divider>
		</>
	);
}

export async function getServerSideProps(context) {
	const { id } = context.query;

	const res = await fetch(`http://localhost:3000/donations/${id}.json`);
	if (!res.ok) {
		throw `Server error: [${resp.status}] [${resp.statusText}] [${resp.url}]`;
	}
	const donation = await res.json();

	return {
		props: {
			donation,
		},
	};
}

export default Donation;
