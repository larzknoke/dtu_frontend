import React, { useState } from "react";
import {
	Typography,
	Divider,
	Image,
	Space,
	Col,
	Row,
	Button,
	Tooltip,
} from "antd";
import {
	HomeOutlined,
	CalendarOutlined,
	PhoneOutlined,
	MailOutlined,
	StarOutlined,
} from "@ant-design/icons";
import Paragraph from "antd/lib/typography/Paragraph";

const { Title, Text } = Typography;

function Donation(props) {
	const { donation = [] } = props;
	const [visible, setVisible] = useState(false);

	let donationImage =
		donation.image_url != undefined
			? donation.image_url
			: "https://via.placeholder.com/400x300";

	return (
		<>
			<Space direction="vertical">
				<Image
					preview={{ visible: false }}
					src={donationImage}
					onClick={() => setVisible(true)}
					width="100%"
				/>
				<div style={{ display: "none" }}>
					<Image.PreviewGroup
						preview={{
							visible,
							onVisibleChange: (vis) => setVisible(vis),
						}}
					>
						<Image src="https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp" />
						<Image src="https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp" />
						<Image src="https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp" />
					</Image.PreviewGroup>
				</div>
				<Row justify="space-between">
					<Col>
						<Title level={2} style={{ marginBottom: 0 }}>
							{donation.title}
						</Title>
					</Col>
					<Col>
						<Tooltip title="Bookmark" placement="left">
							<StarOutlined
								style={{
									fontSize: "24px",
									marginTop: "6px",
									color: "#bbb",
								}}
							/>
						</Tooltip>
					</Col>
				</Row>
				<Divider plain style={{ margin: "2px 0" }}></Divider>
				<Row justify="space-between">
					<Col>
						<Space>
							<HomeOutlined style={{ color: "#bbb" }} />
							<Text>
								{donation.location ? donation.location : "-"}
							</Text>
						</Space>
					</Col>
					<Col>
						<Space>
							<CalendarOutlined style={{ color: "#bbb" }} />
							<Text>{donation.created_month_year}</Text>
						</Space>
					</Col>
				</Row>
				<Divider plain style={{ margin: "2px 0" }}></Divider>
				<Paragraph>{donation.description}</Paragraph>
				<Row gutter="8">
					<Col span={8}>
						<Button
							block
							size="large"
							type="primary"
							htmlType="submit"
							icon={<PhoneOutlined />}
						>
							Call
						</Button>
					</Col>
					<Col span={16}>
						<Button
							block
							size="large"
							type="primary"
							icon={<MailOutlined />}
						>
							Message
						</Button>
					</Col>
				</Row>
			</Space>
		</>
	);
}

export async function getServerSideProps(context) {
	const { id } = context.query;

	const res = await fetch(`http://localhost:3000/donations/${id}.json`);
	if (!res.ok) {
		throw `Server error: [${res.status}] [${res.statusText}] [${res.url}]`;
	}
	const donation = await res.json();

	return {
		props: {
			donation,
		},
	};
}

export default Donation;
