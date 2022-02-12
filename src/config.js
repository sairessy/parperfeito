export default {
	// server: "https://grey-woolen-alder.glitch.me",
	server: "http://localhost:3000",
	headerIconSize: 25,
	colors: {
		primary: "#4b0082",
		headerBackgroundColor: "#fff",
		headerTextsIconsColor: "#000",
	},
	provinces: [
		{ id: 0, label: "Maputo", zones: [
			{idd: 0, label: "Alto Maé"},
			{idd: 1, label: "Baixa"},
			{idd: 2, label: "Museu"},
		]},
		{ id: 1, label: "Gaza", zones: []},
		{ id: 2, label: "Inhambane", zones: []},
		{ id: 3, label: "Sofala", zones: []},
		{ id: 4, label: "Tete", zones: []},
		{ id: 5, label: "Manica", zones: []},
		{ id: 6, label: "Niassa", zones: []},
		{ id: 7, label: "Pemba", zones: []},
		{ id: 8, label: "Lichinga", zones: []},
		{ id: 9, label: "Cabo delgado", zones: []}
	],
	genders: [
		{id: 0, label: "Masculino", icon: "md-male"},
		{id: 1, label: "Feminino", icon: "md-female"},
		{id: 2, label: "Outro", icon: "md-male-female"},
	]
};