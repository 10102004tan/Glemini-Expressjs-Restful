import {Helmet} from "react-helmet";
const DocumentTitle = ({title}:{
    title: string;
}) => {
    return (
        <Helmet>
            <title>{title} | React E-commerce Dashboard Template</title>
        </Helmet>
    )
}

export default DocumentTitle;