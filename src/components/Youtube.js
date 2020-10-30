import '@justinribeiro/lite-youtube';

const Youtube = ({ videoid, ...props}) => (
  <lite-youtube
    class="absolute top-0 left-0 right-0 bottom-0 m-0 p-0"
    autoload={true}
    videoid={videoid}
    {...props}
  />
)

export default Youtube;
