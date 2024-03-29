import React from "react";
import DonationCard from "./DonationCard";
import { Row } from "antd";

function Donations({ donations = [] }) {
	// const { router, donations = [] } = props;

	return (
		<>
			<Row gutter={[16, 14]}>
				{donations.map((donation) => {
					return (
						<DonationCard key={donation.id} donation={donation} />
					);
				})}
			</Row>
		</>
	);
}

export default Donations;
