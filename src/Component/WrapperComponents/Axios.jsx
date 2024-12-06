import axios from 'axios';

async function getData(userUrl) {

    const options = {
        method: 'GET',
        url: userUrl,
        params: { language: 'en-US' },
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMWFlOGRkMzZjNDAyYWUwNTYxY2JlZTEwYzc4NTkwOCIsIm5iZiI6MTczMzE0MDgyNC4yOTUsInN1YiI6IjY3NGRhMTU4OWU3ZjZmNzNmMzAxNTUzZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.G9sC7v1d4lYCu_AN28-ylCPD0QzVjstzVb-khfqbzss'
        }
    };


    try {
        const res = await axios.request(options)
        return res.data
    } catch (error) {
        return error
    }
}

export default getData;