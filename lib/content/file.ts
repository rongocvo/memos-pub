import { compile } from "@mdx-js/mdx";
import rehypePrettyCode from "rehype-pretty-code";
import { ContentFile } from "./type";

const options = {
	theme: "github-dark",
};

const compileMarkdown = async (markdown: string): Promise<string> => {
	if (typeof window !== "undefined")
		throw Error("markdown to HTML should run on server only");

	const fn = await compile(markdown, {
		format: "md",
		outputFormat: "function-body",
		rehypePlugins: [[rehypePrettyCode, options]],
	});
	const code = String(fn);
	return code;
};

export const makeContentFile = async (
	markdown: string
): Promise<ContentFile> => {
	const code = await compileMarkdown(markdown);
	return { type: "file", code };
};
