import { Story, Meta } from '@storybook/react';
import { Provider } from 'react-redux';
import SummaryTable from '../../components/SummaryTable/SummaryTable';
import store from '../../store/store';
import '../../index.css';

export default {
    title: 'Components/SummaryTable',
    component: SummaryTable,
    tags: ['autodocs'],
    decorators: [(Story) => <Provider store={store}><Story /></Provider>],
    parameters: {
        docs: {
            description: {
                component: 'A table that summarizes note categories and their active and archived counts.',
            },
        },
    },
} as Meta;

const Template: Story = (args) => <SummaryTable {...args} />;

export const Default = Template.bind({});
Default.args = {};