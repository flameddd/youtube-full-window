import '@justinribeiro/lite-youtube';

const Youtube = ({ videoid, ...props}) => (
  <lite-youtube
    autoload={true}
    videoid={videoid}
    {...props}
  />
)

export default Youtube;
