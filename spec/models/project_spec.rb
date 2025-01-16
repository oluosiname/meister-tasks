require 'rails_helper'

RSpec.describe Project, type: :model do
  describe "associations" do
    it { is_expected.to have_many(:tasks).dependent(:destroy) }
  end

  describe "validations" do
    subject { create(:project) }
    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_uniqueness_of(:name).case_insensitive }
  end
end
