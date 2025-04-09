import axios from "axios";
const URL = "http://localhost:3000";

export async function getParts() {
	const response = await axios.get(`${URL}/parts`);

	if (response.status === 200) {
		return response.data;
	} else {
		response.status(500).json({ success: false, message: "server error" });
	}
}
export async function getPart(id) {
	const response = await axios.get(`${URL}/parts/${id}`);

	if (response.status === 200) {
		return response.data;
	} else {
		response.status(500).json({ success: false, message: "server error" });
	}
}
export async function createPart(part) {
	const response = await axios.post(`${URL}/parts/`, part);

	if (response.status === 200) {
		return response.data;
	} else {
		response.status(500).json({ success: false, message: "server error" });
	}
}
export async function updatePart(id, part) {
	const response = await axios.put(`${URL}/parts/${id}`, part);

	if (response.status === 200) {
		return response.data;
	} else {
		response.status(500).json({ success: false, message: "server error" });
	}
}
export async function deletePart(id) {
	const response = await axios.delete(`${URL}/parts/${id}`);

	if (response.status === 200) {
		return response;
	} else {
		response.status(500).json({ success: false, message: "server error" });
	}
}
