
const INITIAL_STATE = [
    {
        id: "1",
        title: "Article 1",
        content: "My Content",
        publishedAt: ""
    },
    {
        id: "2",
        title: "Article 2",
        content: "My Content",
        publishedAt: ""
    },
    {
        id: "3",
        title: "Article 2",
        content: "My Content",
        publishedAt: ""
    },
    {
        id: "4",
        title: "Article 2",
        content: "My Content",
        publishedAt: ""
    },
    {
        id: "2",
        title: "Article 2",
        content: "# My Content\n## hello world",
        publishedAt: ""
    },
    {
        id: "5",
        title: "Article 2",
        content: "My Content",
        publishedAt: ""
    },
]

const articlesReducer = (state = INITIAL_STATE, action) => {
    console.log(action)
    switch (action.type) {
        default:
            return state
    }
}

export default articlesReducer
