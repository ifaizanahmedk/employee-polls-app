describe("Poll", () => {
	it("will calculate votes percentage for an option in a poll", () => {
		const optionOne = {
			votes: ["zoshikanlu", "tylermcginnis"],
			text: "Learn Javascript",
		};

		const optionTwo = {
			votes: ["mktsamis"],
			text: "Learn Python",
		};

		const totalPollVotesCount =
			optionOne.votes.length + optionTwo.votes.length;

		const calculateVotesPercentage = (option) => {
			return Math.floor(
				(option.votes.length * 100) / totalPollVotesCount
			);
		};

		const result1 = calculateVotesPercentage(optionOne);
		const result2 = calculateVotesPercentage(optionTwo);

		expect(result1).toEqual(66);
		expect(result2).toEqual(33);
	});
});
