import type { Actions, PageServerLoad } from './$types';
import Airtable from "airtable";
import { env } from '$env/dynamic/private';
import { error, fail } from '@sveltejs/kit';
import { get } from 'svelte/store';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import shortUuid from "short-uuid";

const schema = z.object({
    name: z.string().min(1),
    text: z.string().min(1),
    image: z.string().url().optional()
});

export const load = (async ({ fetch, params }) => {
    console.log(params)
    const form = await superValidate({ name: "Anonymous user" }, schema);
    const airtable = new Airtable({ apiKey: env.AIRTABLE_TOKEN });
    const base = airtable.base("appI748Vztn1CAZSi");
    // check if board exists (params.board)
    const findBoard = await base("boards").select({
        filterByFormula: `{name} = "${params.board}"`,
        maxRecords: 1,
        view: "Grid view"
    }).firstPage();
    if(!findBoard[0]) {
        throw error(404, "Board not found");
    }
    const findBoardId = findBoard[0].id;
    const boardName = findBoard[0].get("name");
    const boardDescription = findBoard[0].get("description");
    const getBoardPosts = await base("posts").select({
        filterByFormula: `{board} = "${boardName}"`,
        maxRecords: 25,
        view: "Grid view"
    }).firstPage();
    const posts = getBoardPosts.map(post => post.fields).reverse() as NahcrofPost[];
    // console.log(findBoardId, boardName, boardDescription, posts);
    if (findBoardId) {
        return {
            findBoardId,
            boardName,
            boardDescription,
            posts,
            form
        }
    }
    return { form }
    
}) satisfies PageServerLoad;

export const actions = {
    default: async ({ request, params }) => {
        const form = await superValidate(request, schema);
        console.log('post', form);

        if(!form.valid) {
            return fail(400, { form });
        }

        const airtable = new Airtable({ apiKey: env.AIRTABLE_TOKEN });
        const base = airtable.base("appI748Vztn1CAZSi");
        const findBoard = await base("boards").select({
            filterByFormula: `{name} = "${params.board}"`,
            maxRecords: 1,
            view: "Grid view"
        }).firstPage();

        if(!findBoard[0]) {
            throw error(404, "Board not found");
        }

        const newIdent = shortUuid().generate();
        const newPost = {
            identifier: newIdent,
            board: params.board,
            name: form.data.name,
            text: form.data.text,
            image: form.data.image
        };

        const createPost = await base("posts").create([ { fields: newPost } ]);
        console.log(createPost);

        return { form };
    }
} satisfies Actions;