import "../src/index.css";

export const parameters = {
	actions: { argTypesRegex: "^on.*" },
	controls: {
		storySort: (a, b) => a[1].id.localeCompare(b[1].id),
	},
};
