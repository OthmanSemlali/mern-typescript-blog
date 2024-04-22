import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css'; // Optional CSS for image loading effect
import no_img from "../assets/img/no-image.svg"

type ImageProps = { src: string | null, alt: string, width: string, height: string, className?: string, }
function Image({ src, alt, className, width, height }: ImageProps) {
    return (
        <LazyLoadImage

            className={`w-full m-0 rounded-t lazy ${className}`}
            // src="data:image/svg+xml,%3Csvg%20xmlns%3D&#39;http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg&#39;%20viewBox%3D&#39;0%200%201%201&#39;%20height%3D&#39;500&#39;%20width%3D&#39;960&#39;%20style%3D&#39;background-color%3Argb(203%2C213%2C224)&#39;%2F%3E"
            src={src || no_img} width={width} height={height}
            effect="blur"
            alt={alt} />
    )
}

export default Image