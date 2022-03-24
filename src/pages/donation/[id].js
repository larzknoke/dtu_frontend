import React, { useState } from "react";
import { Typography, Divider, Image, Space } from "antd";
import { HomeOutlined } from "@ant-design/icons";

const { Title } = Typography;

function Donation(props) {
	const { donation = [] } = props;
	const [visible, setVisible] = useState(false);

	return (
		<>
			<Space direction="vertical">
				<Image
					preview={{ visible: false }}
					src={donation.image_url}
					onClick={() => setVisible(true)}
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
				<Title level={2} style={{ marginBottom: 0 }}>
					{donation.title}
				</Title>
				<Divider plain style={{ margin: "0" }}></Divider>
				<HomeOutlined />
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
