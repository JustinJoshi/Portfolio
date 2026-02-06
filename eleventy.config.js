module.exports = function (eleventyConfig) {
	// Passthrough copy — keep assets and images untouched
	eleventyConfig.addPassthroughCopy("assets");
	eleventyConfig.addPassthroughCopy("images");

	// Collection: devlog posts sorted by date (newest first available via reverse)
	eleventyConfig.addCollection("devlogPosts", function (collectionApi) {
		return collectionApi.getFilteredByTag("devlogPosts").sort((a, b) => {
			return a.date - b.date; // ascending; use .reverse() in templates for newest-first
		});
	});

	// Human-readable date filter (UTC to avoid timezone offset issues)
	eleventyConfig.addFilter("readableDate", (dateObj) => {
		return new Date(dateObj).toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
			timeZone: "UTC",
		});
	});

	// ISO date filter (for <time> datetime attribute)
	eleventyConfig.addFilter("isoDate", (dateObj) => {
		return new Date(dateObj).toISOString().split("T")[0];
	});

	return {
		dir: {
			input: ".",
			includes: "_includes",
			output: "_site",
		},
		templateFormats: ["njk", "md", "html"],
		htmlTemplateEngine: "njk",
		markdownTemplateEngine: "njk",
	};
};
