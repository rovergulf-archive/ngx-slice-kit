/**
 * marked.js options
 * project url: https://github.com/markedjs/marked
 */
export interface MarkedOptions {
    /**
     * prefix for any url
     */
    baseUrl?: string;

    /**
     * Set html 'id' attribute while rendering text headers
     */
    headerIds?: boolean;

    /**
     * Disable sanitizing the output. While set to 'true' – output are not safe!
     */
    disableSanitizing?: boolean;
}
