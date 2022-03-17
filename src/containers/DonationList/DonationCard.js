import React from "react";
import { Card } from "antd";

const { Meta } = Card;

function DonationCard() {
	return (
		<Card
			hoverable
			cover={
				<img
					alt="example"
					src="http://localhost:3000/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBDQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--6f1195c881ae1b6d53c519069277749934024d58/9f9c5cc957db46659e9b3a1940102fe8.webp"
				/>
			}
		>
			<Meta title="Europe Street beat" description="www.instagram.com" />
		</Card>
	);
}

export default DonationCard;
