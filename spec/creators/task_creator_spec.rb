require 'rails_helper'

RSpec.describe TaskCreator, type: :service do
  let(:project) { create(:project) }

  describe '.call' do
    subject { described_class.call(project:) }

    context 'when task creation is successful' do
      it 'returns a success result' do
        result = subject
        expect(result.success).to be true
        expect(result.errors).to be_empty
        expect(result.task).to be_persisted
        expect(result.task.name).to match(/New Task \d+/)
        expect(result.task.project).to eq(project)
      end
    end

    context 'when task creation fails' do
      let(:task) { instance_double(Task) }

      before do
        allow(Task).to receive(:create).and_return(task)
        allow(task).to receive(:persisted?).and_return(false)
        allow(task).to receive(:errors).and_return(
          double("Errors", full_messages: [ "Name cannot be blank" ])
        )
      end

      it 'returns an error result' do
        result = subject

        expect(result.success).to be false
        expect(result.errors).to eq([ 'Name cannot be blank' ])
        expect(result.task).to be_nil
      end
    end
  end
end
