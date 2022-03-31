import React from "react";
import { Card, Col, Divider, Image, Row, Typography, Space } from "antd";
import Link from "next/link";
import {
	HomeOutlined,
	CalendarOutlined,
	PhoneOutlined,
	MailOutlined,
	StarOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

function DonationCard({ donation }) {
	let donationImage =
		donation.image_url != undefined
			? donation.image_url
			: "https://via.placeholder.com/200";

	return (
		<Col xs={24} md={12}>
			<Link href={`/donation/${donation.id}`}>
				<Card className="donation-list-item">
					<Row gutter={18}>
						<Col span={8}>
							<Image
								src={donationImage}
								preview={false}
								// height="100px"
								// width="100px"
							/>
						</Col>
						<Col span={16} className="donation-list-item-text">
							<Title level={5}>{donation.title}</Title>
							<Divider style={{ margin: "7px 0px" }} />
							<Row justify="start" style={{ lineHeight: "1.4" }}>
								<Col span={24}>
									<Space>
										<HomeOutlined
											style={{
												color: "#bbb",
												fontSize: "10px",
											}}
										/>
										<Text
											style={{
												color: "#bbb",
												fontSize: 10,
											}}
										>
											{donation.location
												? donation.location
												: "-"}
										</Text>
									</Space>
								</Col>
								<Col span={24}>
									<Space>
										<CalendarOutlined
											style={{
												color: "#bbb",
												fontSize: "10px",
											}}
										/>
										<Text
											style={{
												color: "#bbb",
												fontSize: 10,
											}}
										>
											{donation.created_month_year}
										</Text>
									</Space>
								</Col>
							</Row>
						</Col>
					</Row>
				</Card>
				{/* <Card
					hoverable
					cover={<img alt="example" src={donation.image_url} />}
				>
					<Meta
						title={donation.title}
						description={donation.description}
					/>
				</Card> */}
			</Link>
		</Col>
	);
}

export default DonationCard;
