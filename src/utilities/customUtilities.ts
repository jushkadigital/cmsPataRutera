
type ConstruirUrlParams = {
    base: string;
    secciones: string;
    isPage: boolean;
};

/**
 * Construye una URL eliminando la sección 2 si `isPage` es true.
 * Usa programación funcional e inmutabilidad.
 */
export const construirUrl = ({ base, secciones, isPage }: ConstruirUrlParams): string => {
    const toSegmentArray = (path: string): string[] =>
        path.split('/').filter(Boolean); // Elimina strings vacíos por slashes dobles

    const eliminarSegunda = (segments: string[]): string[] =>
        segments.length >= 3
            ? segments.filter((_, i) => i !== 1)
            : segments;

    const procesarSecciones = (path: string): string[] =>
        isPage ? eliminarSegunda(toSegmentArray(path)) : toSegmentArray(path);

    const construirPathname = (segments: string[]): string =>
        '/' + segments.join('/');

    const finalPathname = construirPathname(procesarSecciones(secciones));

    return new URL(finalPathname, base).toString();
};