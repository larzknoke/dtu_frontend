import React from "react";
import { Card, Col } from "antd";
import Link from "next/link";

const { Meta } = Card;

function DonationCard({ donation }) {
	return (
		<Col xs={24} md={5}>
			<Link href={`/donation/${donation.id}`}>
				<Card
					hoverable
					cover={<img alt="example" src={donation.image_url} />}
				>
					<Meta
						title={donation.title}
						description={donation.description}
					/>
				</Card>
			</Link>
		</Col>
	);
}

export default DonationCard;
