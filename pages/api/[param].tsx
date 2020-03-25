export default ({ query: { param } }, res) => {
    res.status(200).json({ message: `you requested for ${param} `});
};