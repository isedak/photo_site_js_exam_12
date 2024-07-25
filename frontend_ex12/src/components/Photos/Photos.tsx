import './Photos.css'
import IPhotosProps from './IPhotosProps';
import OnePhoto from './OnePhoto/OnePhoto';

const Photos: React.FunctionComponent<IPhotosProps> = (props: IPhotosProps) => {
    return (
        <div className="Photos-grid">
            {props.photos.map((p) => {
                return <OnePhoto
                    key={p._id}
                    _id={p._id}
                    title={p.title}
                    author={p.author}
                    image={p.image}
                    homepage={props.homepage}
                />
            })}
        </div>
    );
};

export default Photos;