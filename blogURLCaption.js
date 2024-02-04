const db = require('./db')

async function main() {
    const blogs = await db.blog.findAll({})
    const urlCaptions = []
    for (let i = 0; i < blogs.length; i ++) {
        const blog = blogs[i];
        let originUrlCaption = blog.title.replace(/[^a-zA-Z0-9 ]/g, '').replace(/[ ]/g, '-').toLowerCase()
        let urlCaption;
        for (let j = 0;;j ++) {
            urlCaption = originUrlCaption
            if (j) urlCaption += '' + j;
            if (!urlCaptions.includes(urlCaption))
                break;
        }
        await blog.update({urlCaption})
        urlCaptions.push(urlCaption)
    }
}

main()