/**
 * Created by nicolas.looschen@pikobytes.de on 01.02.22
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
import React, {useState} from 'react';

import TagManagementContainer, {TagManagementContainerProps} from "./TagManagementContainer";

const StoryTagManagementContainer = (props: TagManagementContainerProps) => {
    const [value, setValue] = useState<string>('{"tags":[],"tagsToDelete":[]}');

    const handleChange = (value: string) => {setValue(value)};

    return <TagManagementContainer {...props} formField={Object.assign(props.formField ?? {}, {onChange: handleChange, value})} />
}


export default {
    title: "Example/TagManagementContainer",
    component: StoryTagManagementContainer,
}

function Template(args: any) {
    return <StoryTagManagementContainer {...args} />
}


export const Default = Template.bind({});
// @ts-ignore
Default.args = {
    field: {
        key: "test",
        validation: { required: false},
    },
    register: () => { return { ref: React.createRef()}},
};
