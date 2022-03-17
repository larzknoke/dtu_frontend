import React from "react";
import Donations from "src/containers/DonationList";
import Head from "src/components/Head";
import { Col, Row } from "antd";

function DonationPage() {
	return (
		<>
			<Head title="Donations" />
			<Row>
				<Col xs={24} md={4}>
					<Donations /*{...props}*/ />
				</Col>
			</Row>
		</>
	);
}

export default DonationPage;
