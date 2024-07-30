function importAll(requireContext: { keys: () => string[]; (id: string): string }) {
    return requireContext.keys().map(requireContext);
}

const images = importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));

export default images;