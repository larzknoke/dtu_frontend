import React from "react";
import DonationCard from "./DonationCard";
import { Row } from "antd";

function Donations(props) {
	const { router, donations = [] } = props;

	return (
		<>
			<Row gutter={[16, 24]}>
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
