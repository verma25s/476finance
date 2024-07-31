// function defination 
function importAll(requireContext: { keys: () => string[]; (id: string): string }) {
    // return an array   
    return requireContext.keys().map(requireContext);
}
// using the require.context method to get all image files (PNG, JPG, JPEG, SVG)  
const images = importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));
// export the array of imported images as the default export of the module
export default images;